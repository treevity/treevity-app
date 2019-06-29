import { createDecorator } from 'vue-class-component';

// tslint:disable-next-line
export const Meta = createDecorator((options, key) => {
    if (!options.methods) return;
    options['head'] = options.methods[key];
});
