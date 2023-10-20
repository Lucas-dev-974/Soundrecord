<!-- <template>
    <div class="item-list-wrapper">
        <div class="item-list-wrapper-img-container">
            <img class="session-img" :src="imageLink" alt="item-list-wrapper-image">
        </div>

        
    </div>
</template>

<script>

export default {
    props: {
        imageLink: { required: true },
        content: { required: true }
    },
}
</script> -->

<!-- WrapperComponent.vue -->
<template functional>
    <v-popover v-bind="data.attrs" v-on="listeners">
        <template v-for="(_, slot) of scopedSlots" v-slot:[slot]="scope">
            <slot :name="slot" v-bind="scope" />
        </template>
    </v-popover>
</template>

<script>
import { VPopover } from "v-tooltip";
export default {
    functional: true,
    render(h, { data, children }) {
        return h(
            VPopover,
            {
                ...data,
                props: {
                    ...data.props,
                    popoverClass: "helloworld",
                },
            },
            children
        );
    },
};
</script>