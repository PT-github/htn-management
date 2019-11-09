<template>
    <div>
        <script :id="randomId" type="text/plain"></script>
    </div>
</template>
<script>
    import '../../../static/UE/ueditor.config.js'
    import '../../../static/UE/ueditor.all.min.js'
    import '../../../static/UE/lang/zh-cn/zh-cn.js'
    import '../../../static/UE/ueditor.parse.min.js'
    export default {
        name: 'ue',
        data () {
            return {
                randomId: 'editor_' + (Math.random() * 100000000000000000),
                editor: null
            }
        },
        props: {
            value: '',
            config: {}
        },
        mounted () {
            this.editor = window.UE.getEditor(this.randomId, this.config);
            this.editor.addListener('ready',  () => {
                this.editor.setContent(this.value)
            })
        },
        methods: {
            getUEContent () {
                return this.editor.getContent()
            }
        },
        destroyed () {
            this.editor.destroy()
        }
    }
</script>
