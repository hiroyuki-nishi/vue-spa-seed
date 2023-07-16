declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<unknown, unknown, _>;
  export default component;
}