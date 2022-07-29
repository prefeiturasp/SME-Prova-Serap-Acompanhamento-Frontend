/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SERAP_ACOMPANHAMENTO_API: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
