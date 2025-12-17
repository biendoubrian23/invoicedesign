"use client";

import { useState, useEffect, DragEvent } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { listStoredFilesWithFolders, deleteStoredFile, getFileUrl, StoredFile, StorageFolder, deleteClientFolder } from '@/services/invoiceService';
import { getClientByName, deleteClient, Client } from '@/services/clientService';
import DeleteConfirmModal from '@/components/ui/DeleteConfirmModal';
import { FileText, Trash2, Download, RefreshCw, FolderOpen, FolderPlus, Folder, X, Eye, ChevronDown, ChevronRight } from 'lucide-react';

interface FolderItem {
    name: string;
    files: StoredFile[];
    isOpen: boolean;
}

interface PreviewFile {
    url: string;
    name: string;
    type: 'pdf' | 'image';
}

interface StockagePanelProps {
    onPreviewFile?: (file: PreviewFile | null) => void;
}

const StockagePanel = ({ onPreviewFile }: StockagePanelProps) => {
    const { user } = useAuth();
    const { t } = useLanguage();
    const [files, setFiles] = useState<StoredFile[]>([]);
    const [folders, setFolders] = useState<FolderItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [newFolderName, setNewFolderName] = useState('');
    const [showNewFolderInput, setShowNewFolderInput] = useState(false);
    const [draggedFile, setDraggedFile] = useState<StoredFile | null>(null);
    const [dragOverFolder, setDragOverFolder] = useState<string | null>(null);

    // Delete modal state
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<{ name: string, type: 'file' | 'folder', client?: Client } | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const loadFiles = async () => {
        if (!user) {
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        const { rootFiles, folders: realFolders, error } = await listStoredFilesWithFolders();

        if (error) {
            setError(t('storagePanel.loadError'));
        } else {
            // Load localStorage virtual folders
            const savedFolders = localStorage.getItem(`folders_${user.id}`);
            let localFolders: { name: string; fileNames: string[]; isOpen?: boolean }[] = [];

            if (savedFolders) {
                localFolders = JSON.parse(savedFolders);
            }

            // Merge real Supabase folders with localStorage folders
            const allFolderNames = new Set<string>();

            // Add real folders from Supabase
            const mergedFolders: FolderItem[] = realFolders.map((folder: StorageFolder) => {
                allFolderNames.add(folder.name);
                const localFolder = localFolders.find(lf => lf.name === folder.name);
                return {
                    name: folder.name,
                    files: folder.files,
                    isOpen: localFolder?.isOpen ?? false
                };
            });

            // Add localStorage-only folders that don't exist in Supabase
            for (const localFolder of localFolders) {
                if (!allFolderNames.has(localFolder.name)) {
                    const filesInFolder = rootFiles.filter((f: StoredFile) => localFolder.fileNames.includes(f.name));
                    mergedFolders.push({
                        name: localFolder.name,
                        files: filesInFolder,
                        isOpen: localFolder.isOpen ?? false
                    });
                }
            }

            setFolders(mergedFolders);

            // Filter out root files that are in localStorage folders
            const filesInLocalFolders = localFolders.flatMap(f => f.fileNames);
            setFiles(rootFiles.filter((f: StoredFile) => !filesInLocalFolders.includes(f.name)));
        }

        setLoading(false);
    };

    useEffect(() => {
        loadFiles();
    }, [user]);

    const saveFoldersToStorage = (newFolders: FolderItem[]) => {
        if (!user) return;
        const folderData = newFolders.map(f => ({
            name: f.name,
            fileNames: f.files.map(file => file.name),
            isOpen: f.isOpen
        }));
        localStorage.setItem(`folders_${user.id}`, JSON.stringify(folderData));
    };

    const toggleFolder = (folderName: string) => {
        const newFolders = folders.map(f =>
            f.name === folderName ? { ...f, isOpen: !f.isOpen } : f
        );
        setFolders(newFolders);
        saveFoldersToStorage(newFolders);
    };

    const handleDelete = (filename: string) => {
        setItemToDelete({
            name: filename,
            type: 'file'
        });
        setDeleteModalOpen(true);
    };

    const handleDownload = async (filename: string) => {
        const url = await getFileUrl(filename);
        if (url) {
            window.open(url, '_blank');
        }
    };

    const handlePreview = async (file: StoredFile, folderName?: string) => {
        const fullPath = folderName ? `${folderName}/${file.name}` : file.name;
        const url = await getFileUrl(fullPath);
        if (url && onPreviewFile) {
            const type = file.name.endsWith('.pdf') ? 'pdf' : 'image';
            onPreviewFile({ url, name: file.name, type });
        } else if (url) {
            window.open(url, '_blank');
        }
    };

    const handleCreateFolder = () => {
        if (!newFolderName.trim()) return;

        const newFolder: FolderItem = {
            name: newFolderName.trim(),
            files: [],
            isOpen: true
        };

        const newFolders = [...folders, newFolder];
        setFolders(newFolders);
        saveFoldersToStorage(newFolders);
        setNewFolderName('');
        setShowNewFolderInput(false);
    };

    const handleDeleteFolder = async (folderName: string) => {
        // Check for associated client
        const { data: client } = await getClientByName(folderName);

        setItemToDelete({
            name: folderName,
            type: 'folder',
            client: client || undefined
        });
        setDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!itemToDelete) return;
        setIsDeleting(true);

        try {
            if (itemToDelete.type === 'folder' && itemToDelete.client) {
                // Delete client cascade (Client + Folder + Files)
                const { error } = await deleteClient(itemToDelete.client.id);
                if (error) throw new Error(error);
            } else if (itemToDelete.type === 'folder') {
                // Delete folder only
                const { error } = await deleteClientFolder(itemToDelete.name);
                if (error) throw new Error(error.message);

                // Update local virtual folders
                const newFolders = folders.filter(f => f.name !== itemToDelete.name);
                setFolders(newFolders);
                saveFoldersToStorage(newFolders);
            } else {
                // Delete file
                const { error } = await deleteStoredFile(itemToDelete.name);
                if (error) throw new Error(error.message);
            }

            await loadFiles();
        } catch (err: any) {
            setError(err.message || t('storagePanel.deleteError'));
        } finally {
            setIsDeleting(false);
            setDeleteModalOpen(false);
            setItemToDelete(null);
        }
    };

    // Drag and Drop handlers
    const handleDragStart = (e: DragEvent, file: StoredFile) => {
        setDraggedFile(file);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragEnd = () => {
        setDraggedFile(null);
        setDragOverFolder(null);
    };

    const handleDragOver = (e: DragEvent, folderName: string) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        setDragOverFolder(folderName);
    };

    const handleDragLeave = () => {
        setDragOverFolder(null);
    };

    const handleDrop = (e: DragEvent, folderName: string) => {
        e.preventDefault();
        if (!draggedFile) return;

        setFiles(prev => prev.filter(f => f.name !== draggedFile.name));

        const newFolders = folders.map(folder => {
            const filteredFiles = folder.files.filter(f => f.name !== draggedFile.name);

            if (folder.name === folderName) {
                return { ...folder, files: [...filteredFiles, draggedFile], isOpen: true };
            }
            return { ...folder, files: filteredFiles };
        });

        setFolders(newFolders);
        saveFoldersToStorage(newFolders);
        setDraggedFile(null);
        setDragOverFolder(null);
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    };

    const totalSize = [...files, ...folders.flatMap(f => f.files)].reduce((acc, f) => acc + f.metadata.size, 0);
    const totalFiles = files.length + folders.reduce((acc, f) => acc + f.files.length, 0);

    if (!user) {
        return (
            <div className="p-6">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                    {t('storagePanel.storage')}
                </h3>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-sm text-yellow-800">
                        {t('storagePanel.loginRequired')}
                    </p>
                </div>
            </div>
        );
    }

    // Compact file item for inside folders
    const CompactFileItem = ({ file, folderName }: { file: StoredFile, folderName?: string }) => {
        const fullPath = folderName ? `${folderName}/${file.name}` : file.name;

        return (
            <div
                draggable={true}
                onDragStart={(e) => handleDragStart(e, file)}
                onDragEnd={handleDragEnd}
                className={`flex items-center gap-2 p-2 bg-white rounded border border-gray-100 hover:border-gray-300 transition-colors cursor-grab active:cursor-grabbing ${draggedFile?.name === file.name ? 'opacity-50 ring-2 ring-blue-400' : ''
                    }`}
                onClick={() => handlePreview(file, folderName)}
            >
                <FileText className="w-5 h-5 text-blue-500 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-900 truncate">{file.name}</p>
                    <p className="text-[10px] text-gray-400">{formatFileSize(file.metadata.size)} • {formatDate(file.created_at)}</p>
                </div>
                {/* Buttons on the right */}
                <div className="flex items-center gap-0.5 flex-shrink-0">
                    <button
                        onClick={(e) => { e.stopPropagation(); handlePreview(file, folderName); }}
                        className="p-1 text-[10px] text-gray-400 hover:text-green-600 hover:bg-green-50 rounded transition-colors flex items-center gap-0.5"
                        title={t('storagePanel.preview')}
                    >
                        <Eye className="w-3 h-3" />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); handleDownload(fullPath); }}
                        className="p-1 text-[10px] text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors flex items-center gap-0.5"
                        title={t('storagePanel.download')}
                    >
                        <Download className="w-3 h-3" />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); handleDelete(fullPath); }}
                        className="p-1 text-[10px] text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors flex items-center gap-0.5"
                        title="Supprimer"
                    >
                        <Trash2 className="w-3 h-3" />
                    </button>
                </div>
            </div>
        );
    };

    // Root file item (larger)
    const RootFileItem = ({ file }: { file: StoredFile }) => (
        <div
            draggable={true}
            onDragStart={(e) => handleDragStart(e, file)}
            onDragEnd={handleDragEnd}
            className={`flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group cursor-grab active:cursor-grabbing ${draggedFile?.name === file.name ? 'opacity-50 ring-2 ring-blue-400' : ''
                }`}
            onClick={() => handlePreview(file)}
        >
            <FileText className="w-8 h-8 text-blue-500 flex-shrink-0" />

            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>{formatFileSize(file.metadata.size)}</span>
                    <span>•</span>
                    <span>{formatDate(file.created_at)}</span>
                </div>
            </div>

            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                    onClick={(e) => { e.stopPropagation(); handlePreview(file); }}
                    className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                    title="Prévisualiser"
                >
                    <Eye className="w-4 h-4" />
                </button>
                <button
                    onClick={(e) => { e.stopPropagation(); handleDownload(file.name); }}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Télécharger"
                >
                    <Download className="w-4 h-4" />
                </button>
                <button
                    onClick={(e) => { e.stopPropagation(); handleDelete(file.name); }}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Supprimer"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>
        </div>
    );

    return (
        <div className="p-6 space-y-4 overflow-y-auto h-full">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                    {t('storagePanel.storage')}
                </h3>
                <button
                    onClick={loadFiles}
                    disabled={loading}
                    className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    title={t('storagePanel.refresh')}
                >
                    <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                </button>
            </div>

            {/* Description */}
            <p className="text-xs text-gray-500">
                {t('storagePanel.description')}
            </p>

            {/* Create Folder - MOVED TO TOP */}
            <div className="space-y-2">
                {showNewFolderInput ? (
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={newFolderName}
                            onChange={(e) => setNewFolderName(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleCreateFolder()}
                            placeholder={t('storagePanel.folderName')}
                            className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            autoFocus
                        />
                        <button
                            onClick={handleCreateFolder}
                            className="px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
                        >
                            OK
                        </button>
                        <button
                            onClick={() => { setShowNewFolderInput(false); setNewFolderName(''); }}
                            className="px-2 py-2 text-gray-600 rounded-lg hover:bg-gray-100"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => setShowNewFolderInput(true)}
                        className="w-full flex items-center justify-center gap-2 py-2 px-3 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-600 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                    >
                        <FolderPlus className="w-4 h-4" />
                        Créer un dossier
                    </button>
                )}
            </div>

            {/* Error */}
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-sm text-red-700">{error}</p>
                </div>
            )}

            {/* Loading */}
            {loading ? (
                <div className="flex items-center justify-center py-8">
                    <RefreshCw className="w-6 h-6 text-blue-500 animate-spin" />
                </div>
            ) : totalFiles === 0 && folders.length === 0 ? (
                <div className="text-center py-8">
                    <FolderOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-sm text-gray-500">{t('storagePanel.noFiles')}</p>
                    <p className="text-xs text-gray-400 mt-1">
                        {t('storagePanel.exportHint')}
                    </p>
                </div>
            ) : (
                <>
                    {/* Folders */}
                    {folders.length > 0 && (
                        <div className="space-y-2">
                            {folders.map((folder) => (
                                <div
                                    key={folder.name}
                                    onDragOver={(e) => handleDragOver(e, folder.name)}
                                    onDragLeave={handleDragLeave}
                                    onDrop={(e) => handleDrop(e, folder.name)}
                                    className={`border rounded-lg transition-colors ${dragOverFolder === folder.name
                                        ? 'border-blue-400 bg-blue-50'
                                        : 'border-gray-200'
                                        }`}
                                >
                                    {/* Folder Header - Clickable */}
                                    <div
                                        className="flex items-center justify-between p-2.5 cursor-pointer hover:bg-gray-50 transition-colors"
                                        onClick={() => toggleFolder(folder.name)}
                                    >
                                        <div className="flex items-center gap-2">
                                            {folder.isOpen ? (
                                                <ChevronDown className="w-4 h-4 text-gray-400" />
                                            ) : (
                                                <ChevronRight className="w-4 h-4 text-gray-400" />
                                            )}
                                            <Folder className="w-5 h-5 text-yellow-500" />
                                            <span className="text-sm font-medium text-gray-900">{folder.name}</span>
                                            <span className="text-xs text-gray-400">({folder.files.length})</span>
                                        </div>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleDeleteFolder(folder.name); }}
                                            className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                                            title={t('storagePanel.deleteFolder')}
                                        >
                                            <X className="w-3.5 h-3.5" />
                                        </button>
                                    </div>

                                    {/* Folder Content - Collapsible */}
                                    {folder.isOpen && (
                                        <div className="px-2 pb-2 border-t border-gray-100">
                                            {folder.files.length > 0 ? (
                                                <div className="space-y-2 pt-2">
                                                    {folder.files.map((file) => (
                                                        <CompactFileItem key={file.id} file={file} folderName={folder.name} />
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="py-3 text-center text-xs text-gray-400">
                                                    {t('storagePanel.dragHere')}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Root Files */}
                    {files.length > 0 && (
                        <div className="space-y-2">
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                                {t('storagePanel.files')}
                            </p>
                            {files.map((file) => (
                                <RootFileItem key={file.id} file={file} />
                            ))}
                        </div>
                    )}
                </>
            )}

            {/* Storage Info */}
            {(totalFiles > 0 || folders.length > 0) && (
                <div className="pt-3 border-t border-gray-200">
                    <p className="text-xs text-gray-500 text-center">
                        {totalFiles} {totalFiles > 1 ? t('storagePanel.filesPlural') : t('storagePanel.file')} • {formatFileSize(totalSize)} {t('storagePanel.filesUsed')}
                    </p>
                </div>
            )}
            {/* Delete Confirmation Modal */}
            <DeleteConfirmModal
                isOpen={deleteModalOpen}
                onClose={() => { setDeleteModalOpen(false); setItemToDelete(null); }}
                onConfirm={handleConfirmDelete}
                clientName={itemToDelete?.client?.name || itemToDelete?.name || ''}
                isDeleting={isDeleting}
                title={itemToDelete?.type === 'folder' && itemToDelete?.client ? "Supprimer ce client ?" : `Supprimer ce ${itemToDelete?.type === 'folder' ? 'dossier' : 'fichier'} ?`}
                customWarning={
                    itemToDelete?.type === 'folder' && !itemToDelete?.client ? (
                        <div className="bg-amber-50 border border-amber-200 p-4">
                            <p className="text-sm text-amber-800">
                                <strong>Attention !</strong> Cette action est irréversible et va supprimer :
                            </p>
                            <ul className="mt-2 text-sm text-amber-700 list-disc list-inside space-y-1">
                                <li>Le dossier <strong>{itemToDelete.name}</strong></li>
                                <li>Tous les fichiers contenus dans ce dossier</li>
                            </ul>
                        </div>
                    ) : itemToDelete?.type === 'file' ? (
                        <div className="bg-amber-50 border border-amber-200 p-4">
                            <p className="text-sm text-amber-800">
                                Action irréversible. Le fichier <strong>{itemToDelete.name}</strong> sera définitivement supprimé.
                            </p>
                        </div>
                    ) : undefined
                }
            />
        </div>
    );
};

export default StockagePanel;
