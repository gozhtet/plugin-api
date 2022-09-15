import { PluginProvider, PluginApi, Document } from '@gozhtet/plugin-api';

class MyCustomPlugin extends PluginProvider {
	sidebar = {
		label: {
			ru: 'Мой плагин',
			en: 'My plugin',
		},
		onAddNewDocument: this.onAddNewDocument.bind(this),
	};

	onInit() {
		console.log('init my plugin');
	}

	onAddNewDocument() {
		const document: Document = {
			id: '1',
			name: 'test file',
			content: 'Test content',
		};

		this.documents.add(document);
	}

	onUpdateDocument(document) {
		console.log('update current document content', document);
	}
}

export const register = (api: PluginApi): PluginProvider => {
	console.log(api);

	return new MyCustomPlugin();
};
