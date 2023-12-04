
export const FORBIDDEN_WORD = "flowww"
export const MIN_LENGTH_INPUT = 4

export enum ErrorMessages {
    NotFound = "Usuario no encontrado.",
    General = "Ha ocurrido un error. Vuelve a intentarlo.",
    ForbiddenWord = `No puede contener la palabra '${FORBIDDEN_WORD}'.`,
    MinLength = "Ingresa mínimo 4 caracteres."
}

export default ErrorMessages