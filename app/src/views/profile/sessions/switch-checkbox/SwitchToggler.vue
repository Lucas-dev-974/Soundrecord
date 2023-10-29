<template>
    <label class="switch">
        <input type="checkbox" @change="onChangeHandler" :checked="this.checkedValue">
        <span class="slider round"></span>
    </label>
</template>

<script>
import "./SwitchToggler.css"

export default {
    props: {
        checked: { required: true },
        onChange: { required: true }
    },

    data() {
        return {
            checkedValue: false
        }
    },

    mounted() {
        this.checkedValue = this.checked
    },

    methods: {
        onChangeHandler: async function () {
            this.checkedValue = !this.checkedValue
            await this.onChange(this.checkedValue)
        }
    }
}
</script>