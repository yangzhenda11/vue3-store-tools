/*
 * @Author: 陶帅星
 * @Date: 2022-10-01 13:22:14
 * @LastEditTime: 2023-06-02 19:19:16
 * @LastEditors: 陶帅星
 * @Description:
 * @FilePath: \vue3-store-tools\src\visual-editor\components\left-aside\components\container-component\index.tsx
 */
import { defineComponent } from 'vue';
import { cloneDeep } from 'lodash-es';
import Draggable from 'vuedraggable';
import { Money } from '@element-plus/icons-vue';
import styles from '../base-widgets/index.module.scss';
import type { VisualEditorComponent } from '@/visual-editor/visual-editor.utils';
import { visualConfig } from '@/visual.config';
import { createNewBlock } from '@/visual-editor/visual-editor.utils';

export default defineComponent({
  name: 'PropertyComponent',
  label: '资产组件',
  icon: Money,
  order: 5,
  setup() {
    const log = (evt) => {
      window.console.log(evt);
    };
    // 克隆组件
    const cloneDog = (comp) => {
      console.log('当前拖拽的组件：', comp);
      const newComp = cloneDeep(comp);
      return createNewBlock(newComp);
    };

    return () => (
      <>
        <Draggable
          class={styles.listGroup}
          sort={false}
          forceFallback={false}
          list={visualConfig.componentModules.propertyComponents}
          group={{ name: 'components', pull: 'clone', put: false }}
          clone={cloneDog}
          item-key="_vid"
          onChange={log}
        >
          {{
            item: ({ element }: { element: VisualEditorComponent }) => (
              <div class={styles.listGroupItem} data-label={element.label}>
                {element.preview()}
              </div>
            ),
          }}
        </Draggable>
      </>
    );
  },
});
