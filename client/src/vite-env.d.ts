/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly STREAM_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
