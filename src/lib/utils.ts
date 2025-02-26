import { Pessoa } from "@prisma/client";

export function removerSenhaPessoa(pessoa: Pessoa | null) {
  if (pessoa === null) {
    return null;
  }

  const { password, ...resto } = pessoa;
  return resto;
}