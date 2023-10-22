<template>
    <label class="switch">
        <input type="checkbox" @change="onChange" :checked="this.checkedValue">
        <span class="slider round"></span>
    </label>
</template>

<script>
import "./SwitchToggler.css"

export default {
    props: {
        checked: { required: true },
    },

    data() {
        return {
            checkedValue: false
        }
    },

    mounted() {
        console.log(this.checked);
        this.checkedValue = this.checked
        console.log("switch mounted");
    },

    methods: {
        onChange: function () {
            this.checkedValue = !this.checkedValue
            this.$emit("updatePublic", this.checked)
        }
    }
}
</script>