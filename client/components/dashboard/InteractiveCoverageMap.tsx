
import { useRef, useEffect } from 'react';
import Map from '@arcgis/core/Map';
import SceneView from '@arcgis/core/views/SceneView';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import Sketch from '@arcgis/core/widgets/Sketch';
import "@arcgis/core/assets/esri/themes/light/main.css";

interface InteractiveCoverageMapProps {
  onGeometryChange: (geometry: any) => void;
}

export function InteractiveCoverageMap({ onGeometryChange }: InteractiveCoverageMapProps) {
  const viewDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let view: SceneView | null = null;

    if (viewDiv.current) {
      const map = new Map({ basemap: 'streets-vector', ground: 'world-elevation' });
      const graphicsLayer = new GraphicsLayer();
      map.add(graphicsLayer);

      view = new SceneView({
        container: viewDiv.current,
        map,
        center: [-80.8431, 35.2271],
        zoom: 13,
        camera: { position: { x: -80.8431, y: 35.15, z: 5000 }, tilt: 65 },
        popup: { defaultPopupTemplateEnabled: false },
      });

      const sketch = new Sketch({
        layer: graphicsLayer,
        view,
        creationMode: 'update',
        availableCreateTools: ['polygon'],
        defaultUpdateOptions: { tool: 'reshape' },
        snappingOptions: { enabled: true, featureSources: [{ layer: graphicsLayer, enabled: true }] },
      });

      view.ui.add(sketch, 'top-right');

      sketch.on(['create', 'update'], (event) => {
        if (event.state === 'complete' && event.graphic) {
          onGeometryChange(event.graphic.geometry.toJSON());
        }
      });

      sketch.on('delete', () => {
        onGeometryChange(null);
      });

    }

    return () => {
      view?.destroy();
    };
  }, [onGeometryChange]);

  return <div ref={viewDiv} className="w-full h-full"></div>;
}
