"use client"; // This is a client component 👈🏽
import React, { useEffect, useRef, useState } from "react";

import { createEditor, createWorkspaceOptions } from "./utils";
import { __unstableSchemas, AffineSchemas } from "@blocksuite/blocks/models";
import { useMount, useUpdate, useUpdateEffect } from "ahooks";
import type { Page } from "@blocksuite/store";
import { Text, Workspace } from "@blocksuite/store";
import { ContentParser } from "@blocksuite/blocks/content-parser";
import "@blocksuite/editor/themes/affine.css";
import { presetMarkdown } from "./data";
import { PageBlockModel, getDefaultPage } from "@blocksuite/blocks";
export interface IEditorProps {
  className?: string;
}

const options = createWorkspaceOptions();
const pageId = "step-article-page";
const Editor: React.FC<IEditorProps> = (props) => {
  const { className } = props;

  const [displayMarkdown, setDisplayMarkdown] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [canEditor, setCanEditor] = useState<boolean>(false);
  const exportPDF = () => {
    window.print();
  };
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  useEffect(() => {
    // 获取浏览器参数
    const url = new URL(window.location.href);
    const searchParams = url.searchParams;
    const init = searchParams.get("init");

    if (init === "streaming") {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayMarkdown(presetMarkdown.substring(0, i));
        i++;
        if (i > presetMarkdown.length) {
          setCanEditor(true);
          clearInterval(interval);
        }
      }, 10);
      return () => clearInterval(interval);
    } else {
      setCanEditor(true);
      setDisplayMarkdown(presetMarkdown);
    }
  }, []);

  const ref = useRef<HTMLDivElement>(null);

  const workspaceRef = useRef<Workspace>(null!);
  const pageRef = useRef<Page>(null!);

  const pageBlockIdRef = useRef<string>("");
  const contentParserRef = useRef<ContentParser>(null!);
  const [frameId, setFrameId] = useState<string>("");

  // 初始化workspace、page
  useMount(() => {
    if (
      ref.current &&
      !workspaceRef.current &&
      !pageRef.current &&
      !pageBlockIdRef.current
    ) {
      const workspace = new Workspace(options)
        .register(AffineSchemas)
        .register(__unstableSchemas);
      const page = workspace.createPage({ id: pageId });
      const contentParser = new ContentParser(page);
      createEditor(page, ref.current);
      pageRef.current = page;
      workspaceRef.current = workspace;

      contentParserRef.current = contentParser;
    }
  });

  useEffect(() => {
    if (!pageRef.current) {
      return;
    }
    if (!pageBlockIdRef.current) {
      const _pageBlockId = pageRef.current.addBlock("affine:page", {
        title: new Text("Wel"),
      });
      pageBlockIdRef.current = _pageBlockId;
    }
  }, []);

  useUpdateEffect(() => {
    const page = pageRef.current;
    if (!page) {
      return;
    }
    const root = page.root;
    if (root) {
      const blocks = root.children;
      console.log(blocks);
      if (blocks.length) {
        blocks.forEach((item) => {
          page.deleteBlock(item);
        });
      }
    }
    page.resetHistory();

    const frameId = pageRef.current.addBlock(
      "affine:frame",
      {},
      pageBlockIdRef.current
    );
    contentParserRef.current.importMarkdown(displayMarkdown, frameId);
  }, [displayMarkdown]);

  const onChangeTitle = () => {
    if (pageBlockIdRef.current) {
      const block = pageRef.current.getBlockById(
        pageBlockIdRef.current
      ) as PageBlockModel;
      if (block) {
        const pageComponent = getDefaultPage(pageRef.current);

        /* 重置title且失焦 */
        if (pageComponent) {
          pageComponent.titleVEditor.setText("new title123");
          setTimeout(() => {
            pageComponent.titleVEditor.rootElement.blur();
          }, 10);
        }
      }
    }
  };

  const onDelAllBlocks = () => {
    const page = pageRef.current;
    if (page) {
      const root = page.root;
      if (root) {
        const blocks = root.children;

        if (blocks.length) {
          blocks.forEach((item) => {
            page.deleteBlock(item);
          });
        }
      }
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center sm:px-5 sm:pt-[calc(15vh)]">
      <a
        href="https://github.com/toeverything/blocksuite"
        target="_blank"
        className="print:hidden fixed bottom-5 left-5 z-10 max-h-fit rounded-lg p-2 transition-colors duration-200 hover:bg-stone-100 sm:bottom-auto sm:top-5"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
        </svg>
      </a>

      <button
        id="dropdownMenuIconButton"
        onClick={toggleMenu}
        className="print:hidden absolute top-5 right-5 z-10 inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        type="button"
      >
        <svg
          className="w-4 h-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 4 15"
        >
          <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
        </svg>
      </button>

      <div
        id="dropdownDotsHorizontal"
        className={`
          ${
            isMenuOpen ? "" : "hidden"
          } print:hidden absolute top-12 right-5 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}
      >
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownMenuIconHorizontalButton"
        >
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Light Mode
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Dark Mode
            </a>
          </li>
          <li>
            <a
              onClick={exportPDF}
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Export PDF
            </a>
          </li>
        </ul>
        <div className="py-2">
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
          >
            Export PNG
          </a>
        </div>
      </div>

      <div className="relative min-h-[500px] w-full max-w-screen-lg border-stone-200 bg-white p-12 px-8 sm:mb-[calc(20vh)] sm:rounded-lg sm:border sm:px-12 sm:shadow-lg">
        <div ref={ref} />
      </div>
    </div>
  );
};

export default Editor;
