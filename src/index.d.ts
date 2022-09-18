import * as tauri from '@tauri-apps/api';
import { Axios } from 'axios';

interface Documents {
	subscribe(cb: (documents: Array<Document>) => void): () => void;
	add(document: Document): void;
	addAll(documents: Array<Document>): void;
	remove(document: Document): void;
	removeAll(): void;
	get(): Array<Document>;
	update(callback: (state: Array<Document>) => Array<Document>): void;
}

interface Sidebar {
	label: string | Record<string, string>;
}

export class PluginProvider {
	documents: Documents;
	sidebar?: Sidebar;
	onInit?(): void;
	onUpdateDocument?(document: Document): void;
	onAddNewDocument?(document?: Document): void;
	changeDocumentPosition?(document: Document): void;
	removeDocument?(document: Document): void;
	onAddGroup?(): void;
}

export interface Document {
	id: string;
	name: string;
	content?: string;
	position?: number;
	type?: 'document' | 'folder';
	parentId?: string;
	children?: Document[];
}

export interface PluginApi {
	fetch: Axios;
	platform: typeof tauri.os.platform;
	shell: typeof tauri.shell;
	notification: {
		show: typeof tauri.notification.sendNotification;
	};
	clipboard: typeof tauri.clipboard;
	dialog: typeof tauri.dialog;
}
