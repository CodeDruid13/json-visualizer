import React from "react";
import dynamic from "next/dynamic";
import styled from "styled-components";
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import useGraph from "src/store/useGraph";

export const StyledEditor = styled(Allotment)`
  position: relative !important;
  display: flex;
  background: ${({ theme }) => theme.BACKGROUND_SECONDARY};
  height: calc(100vh);
`;

const LiveEditor = dynamic(() => import("src/containers/Editor/LiveEditor"), {
  ssr: false,
});

const Panes: React.FC = () => {
  const fullscreen = useGraph(state => state.fullscreen);
  const toggleFullscreen = useGraph(state => state.toggleFullscreen);
  const isMobile = React.useMemo(() => window.innerWidth <= 768, []);

  React.useEffect(() => {
    if (isMobile) toggleFullscreen(true);
  }, [isMobile, toggleFullscreen]);

  return (
    <StyledEditor proportionalLayout={false} vertical={isMobile}>
      <Allotment.Pane minSize={0} maxSize={isMobile && !fullscreen ? 0 : Infinity}>
        <LiveEditor />
      </Allotment.Pane>
    </StyledEditor>
  );
};

export default Panes;
