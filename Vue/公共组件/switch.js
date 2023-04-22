
(function ({ createApp, reactive, onMounted, ref}) {
    console.log(app)
    app.component('uiSwitch', {
        props: ['flag'],
        emits: ['changed'],
        setup(props, context) {
            // console.log(context.slots.default())
            function onChanged(e) {
                // console.log('emit changed', e.target.checked)
                context.emit('changed', e.target.checked)
            }
            return {
                onChanged
            }
        },
        template: `
            <div class="ui-switch">
                <input type="checkbox" name="wifi" :checked="flag" @change="onChanged"/>
                <label for="wifi" class="check"></label>
            </div>
        `
    })
})(Vue)
