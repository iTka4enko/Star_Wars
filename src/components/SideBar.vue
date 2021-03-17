<template>
    <aside>
        <div 
            class="aside"
            :style="`width: ${width}px`"
        >
            <slot></slot>
            <div 
                @click="close" 
                class="aside__close"
            >
                <div></div>
                <div></div>
            </div>
        </div>
    </aside>
</template>

<script>
import Select from '@/components/Select/Select'

export default {
    props:{
        width: Number
    },
    components:{
        Select
    },
    methods:{
        close(){
            this.$emit('close')
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/colors.scss';

.aside{
    padding: 25px 35px;

    height: 100vh;

    background-color: #fff;
    box-shadow: $shadow;

    &__close{
        position: absolute;
        top: 12px;
        right: 14px;
        cursor: pointer;
        width: 20px;
        height: 20px;

        div{
            margin-top: 10px;
            width: 100%;
            height: 1px;
            background-color: darken($primary, 20%);
            display: block;
            position: absolute;
        }
        div:first-child{
            transform: rotate(45deg);
        }
        div:last-child{
            transform: rotate(-45deg);
        }

        &:hover>div{
            background-color: $red;
        }
    }
}
</style>