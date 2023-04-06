export default function fillPageStyleFn(offset: number) {
  return {
    height: offset ? `calc(100vh - ${offset}px)` : '100vh',
  };
}
