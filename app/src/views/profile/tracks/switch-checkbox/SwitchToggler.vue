<template>
    <label class="switch">
        <input type="checkbox" @change="onChangeHandler" :checked="checked">
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

    methods: {
        onChangeHandler: function () {
            if (this.checked) this.checked = false
            else this.checked = true
            this.onChange(this.checked)
        }
    }
}
</script>