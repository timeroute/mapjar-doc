import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: '🚀 高性能渲染',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        基于 WebGL2 的 GPU 加速渲染，支持高 DPR 屏幕，Web Worker 并发加载瓦片，
        智能缓存和视锥剔除，提供流畅的地图体验。
      </>
    ),
  },
  {
    title: '🗺️ 丰富的图层',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        支持瓦片、矢量、GeoJSON、图像、风场、热力图、覆盖层等多种图层类型，
        满足各种地图可视化需求。
      </>
    ),
  },
  {
    title: '🎯 强大的交互',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        流畅的平移、缩放、旋转，平滑的 flyTo 和 fitBounds 动画，
        完善的事件系统，支持数据驱动样式和空间查询。
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
