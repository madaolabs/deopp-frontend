import React from "react";
import "./style.scss";

const OverFlowXMore: React.FC<{
  children: React.ReactNode;
  onScroll: (p: any) => void;
}> = ({ children, onScroll }) => {
  const overflowX = React.useRef<HTMLDivElement>(null);
  const overflowWidth = React.useRef<HTMLDivElement>(null);
  const [more, setMore] = React.useState(true);
  const [before, setBefore] = React.useState(false);
  const onXscrollChange = (args: any) => {
    onScroll(args);
    setMore(
      overflowWidth.current!.offsetWidth >
        overflowX.current!.offsetWidth + overflowX.current!.scrollLeft
    );
    setBefore(!!overflowX.current!.scrollLeft);
  };

  React.useEffect(() => {
    // onXscrollChange();
    overflowX.current?.addEventListener("scroll", onXscrollChange);
  }, [children]);

  return (
    <div
      className={`Xmore${more ? " Xmore-after" : ""}${
        before ? " Xmore-before" : ""
      }`}
    >
      <div className="Xmore-overflowX" ref={overflowX}>
        <div ref={overflowWidth}>{children}</div>
      </div>
    </div>
  );
};

export default OverFlowXMore;
