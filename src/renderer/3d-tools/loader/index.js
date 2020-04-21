import 'regenerator-runtime/runtime';

import FontFaceObserver from 'fontfaceobserver';
import { Loader } from 'pixi.js';

class ResourceManager extends Loader {
  constructor () {
    super();
  }

  async addFonts (fonts) {
    const promises = fonts.map((fontName) =>
    {
        const ffo = new FontFaceObserver(fontName);

        return ffo.load();
    });

    await Promise.all(promises);

    console.log('loaded!!!');
    
  }
}

export { ResourceManager }