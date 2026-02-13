export function sanitizeFilename(filename: string): string {
  return filename
    .replace(/[/\\:*?"<>|]/g, "-") // 특수문자 제거
    .replace(/\s+/g, "_") // 공백을 언더스코어로
    .substring(0, 200); // 너무 긴 파일명 방지
}
