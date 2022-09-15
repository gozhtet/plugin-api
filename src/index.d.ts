import * as tauri from '@tauri-apps/api';
import { Axios } from 'axios';

interface Documents {
	subscribe(cb: (documents: Array<Document>) => void): () => void;
	add(document: Document): void;
	addAll(documents: Array<Document>): void;
	remove(document: Document | string): void;
	removeAll(): void;
	get(): Array<Document>;
}

interface Sidebar {
	label: string | Record<string, string>;
	onAddNewDocument?: () => void;
}

export class PluginProvider {
	documents: Documents;

	sidebar?: Sidebar;
}

export interface Document {
	id: string;
	name: string;
	content?: string;
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
