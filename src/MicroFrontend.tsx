import React from 'react';

type FrontendName = 'sso' | 'sell' | 'invest';

type FrontEnd = {
  register: (container: string, history: History) => void;
  unregister: (container: string) => void;
};

declare global {
  interface Window {
    frontends: Record<FrontendName, FrontEnd>;
    register: (id: FrontendName, history: History) => void;
    unregister: (id: FrontendName) => void;
  }
}

window.frontends = window.frontends || {};

const register = (id: FrontendName, history: History) => {
  if (!window.frontends || !window.frontends[id]) {
    return;
  }
  window.frontends[id].register(`${id}-container`, history);
};

const unregister = (id: FrontendName) => {
  if (!window.frontends || !window.frontends[id]) {
    return;
  }
  window.frontends[id].unregister(`${id}-container`);
};

type MicroFrontendProps = {
  name: FrontendName;
  host: string;
  history: History;
};

class MicroFrontend extends React.Component<MicroFrontendProps> {
  componentDidMount() {
    const { name, host } = this.props;
    const scriptId = `micro-frontend-script-${name}`;

    if (document.getElementById(scriptId)) {
      this.renderMicroFrontend();
      return;
    }

    fetch(`${host}/asset-manifest.json`)
      .then(res => res.json())
      .then(manifest => {
        const script = document.createElement('script');
        script.id = scriptId;
        script.crossOrigin = '';
        script.src = `${host}${manifest.files['main.js']}`;
        script.onload = this.renderMicroFrontend;
        document.head.appendChild(script);
      });
  }

  componentWillUnmount() {
    const { name } = this.props;

    unregister(name);
  }

  renderMicroFrontend = () => {
    const { name, history } = this.props;
    register(name, history);
  };

  render() {
    const { name } = this.props;
    return <main id={`${name}-container`} />;
  }
}

export default MicroFrontend;
