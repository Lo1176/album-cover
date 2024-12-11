const regex = /\s*\(\d+\)$/;

export default function removeParenthesesAndNumbers(str: string) {
  return str.replace(regex, '');
}
