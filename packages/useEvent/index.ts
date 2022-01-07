interface iPoint {
  width: number;
  height: number;
}

const point: iPoint = { width: 0, height: 0 };
const table = {
  source: null,
};

export const windowSizeEvent = (fn) => {
  console.log("t1 ", table.source);
  // window.addEventListener("resize", () => {
  //   // point.width = window.outerWidth;
  //   // point.height = window.innerHeight;
  //   console.log(111, table.source);
  //   if (table.source != null) {
  //     (table.source as any).height = window.innerHeight;
  //     console.log("size");
  //   }
  // });
};

export const elementTableWapperAutoHeight = (table) => {
  console.log("table > ", table);
  table.source = table;
  console.log("t", table.source);
  window.addEventListener("resize", table);
};
