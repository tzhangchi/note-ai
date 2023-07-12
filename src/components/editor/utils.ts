import {
  assertExists,
  createIndexeddbStorage,
  createMemoryStorage,
  createSimpleServerStorage,
  DebugDocProvider,
  type DocProviderConstructor,
  Generator,
  Utils,
  Workspace,
  type WorkspaceOptions,
} from "@blocksuite/store";
import type { BlobStorage, Page } from "@blocksuite/store";
// import type { IShape } from "@blocksuite/phasor";
import * as Y from "yjs";
import { EditorContainer } from "@blocksuite/editor";
/**
 * Provider configuration is specified by `?providers=webrtc` or `?providers=indexeddb,webrtc` in URL params.
 * We use webrtcDocProvider by default if the `providers` param is missing.
 */
export function createWorkspaceOptions(): WorkspaceOptions {
  const providers: DocProviderConstructor[] = [];
  const blobStorages: ((id: string) => BlobStorage)[] = [];
  let idGenerator: Generator = Generator.AutoIncrement; // works only in single user mode
  blobStorages.push(createMemoryStorage);
  return {
    id: "step-article",
    providers,
    idGenerator,
    blobStorages,
    defaultFlags: {
      enable_toggle_block: true,
      enable_set_remote_flag: true,
      enable_drag_handle: true,
      enable_block_hub: true,
      enable_database: true,
      enable_edgeless_toolbar: true,
      enable_linked_page: true,
      enable_bookmark_operation: false,
      readonly: {
        "space:page0": false,
      },
    },
  };
}

// export function addShapeElement(
//   page: Page,
//   surfaceBlockId: string,
//   shape: IShape
// ) {
//   const shapeYElement = new Y.Map();
//   for (const [key, value] of Object.entries(shape)) {
//     shapeYElement.set(key, value);
//   }
//   const yBlock = page.getYBlockById(surfaceBlockId);
//   assertExists(yBlock);
//   let yContainer = yBlock.get("elements") as InstanceType<typeof page.YMap>;
//   if (!yContainer) {
//     yContainer = new page.YMap();
//     yBlock.set("elements", yContainer);
//   }
//   yContainer.set(shape.id as string, shapeYElement);
// }

export const createEditor = (page: Page, element: HTMLElement) => {
  const editor = new EditorContainer();
  editor.page = page;
  editor.slots.pageLinkClicked.on(({ pageId }) => {
    const target = page.workspace.getPage(pageId);
    if (!target) {
      throw new Error(`Failed to jump to page ${pageId}`);
    }
    editor.page = target;
  });

  element.append(editor);

  editor.createBlockHub().then((blockHub) => {
    document.body.appendChild(blockHub);
  });
  return editor;
};
