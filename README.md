<a href="https://note-ai.vercel.app/">

![image](https://github.com/tzhangchi/note-ai/assets/5910926/0034da2b-3e6a-4898-9644-e3d30613e7cb)

  <h1 align="center">Note AI</h1>
</a>

<p align="center">
  An open-source Notion-style  WYSIWYG editor with AI-powered autocompletions. 
</p>

<p align="center">
  <a href="https://github.com/tzhangchi/note-ai/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/tzhangchi/note-ai?label=license&logo=github&color=807&logoColor=fff" alt="License" />
  </a>
  <a href="https://github.com/tzhangchi/note-ai"><img src="https://img.shields.io/github/stars/tzhangchi/note-ai?style=social" alt="note-ai.vercel.app's GitHub repo"></a>
</p>

<p align="center">
  <a href="#introduction"><strong>Introduction</strong></a> ·
  <a href="#deploy-your-own"><strong>Deploy Your Own</strong></a> ·
  <a href="#setting-up-locally"><strong>Setting Up Locally</strong></a> ·
  <a href="#tech-stack"><strong>Tech Stack</strong></a> ·
  <a href="#contributing"><strong>Contributing</strong></a> ·
  <a href="#license"><strong>License</strong></a>
</p>
<br/>

## Introduction

[Note AI](https://note-ai.vercel.app/) is a Notion-style WYSIWYG editor with AI-powered autocompletions.

Here's a quick 20-second demo:



https://github.com/tzhangchi/note-ai/assets/5910926/c5fa9b6d-4199-4a8c-9c90-98f7785a6281



<br />

## Deploy Your Own

You can deploy your own version of Note AI to Vercel with one click:

[![WIP Deploy with Vercel](https://vercel.com/button)](https://note-ai.vercel.app/)

## Setting Up Locally

To set up Note AI locally, you'll need to clone the repository and set up the following environment variables:

- `OPENAI_API_KEY` – your OpenAI API key (you can get one [here](https://platform.openai.com/account/api-keys))

If you've deployed this to Vercel, you can also use [`vc env pull`](https://vercel.com/docs/cli/env#exporting-development-environment-variables) to pull the environment variables from your Vercel project.

## Tech Stack

Note AI is built on the following stack:

- [Next.js](https://nextjs.org/) – framework
- [blocksuite](https://blocksuite.affine.pro/) – text editor
- [OpenAI](https://openai.com/) - AI completions
- [Vercel AI SDK](https://sdk.vercel.ai/docs) – AI library
- [Vercel](https://vercel.com) – deployments
- [TailwindCSS](https://tailwindcss.com/) – styles

## Contributing

Here's how you can contribute:

- [Open an issue](https://github.com/tzhangchi/note-ai/issues) if you believe you've encountered a bug.
- Make a [pull request](https://github.com/tzhangchi/note-ai/pull) to add new features/make quality-of-life improvements/fix bugs.

## Author

- Chi Zhang ([@Terrychinaz](https://twitter.com/Terrychinaz))

## License

Licensed under the [MIT license](https://github.com/tzhangchi/note-ai/blob/main/LICENSE.md).
