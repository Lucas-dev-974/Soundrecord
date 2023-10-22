<template>
    <label class="switch">
        <input type="checkbox" @change="onChange" checked>
        <span class="slider round"></span>
    </label>
</template>

<script>
import "./SwitchToggler.css"

export default {
    props: { checked: { required: true }, },

    methods: {
        onChange: function () {
            this.$emit("updatePublic")
        }
    }
}
</script>