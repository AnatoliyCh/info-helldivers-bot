import useConfig from './features/use-config';
import useScreenshot from './features/use-screenshot';

const config = useConfig();
const screenshot = await useScreenshot(config);

await screenshot.close();
