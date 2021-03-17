<template>
    <div 
        class="select"
        @mouseover="showOptions"
        @mouseout="hiddeOptions"
    >
        <div class="select__default">
            <template v-if="!burgerMenu || !isSmallScreen">
                <div>
                    {{selected}}
                </div>
                <img 
                    class="select__arrow" src="@/assets/images/down-arrow.svg" 
                    alt=""
                >
            </template>
            <template v-else>
                <div  
                    @click="showSideBar"
                    class="select__burger"
                >
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </template>
        </div>
        <div 
            class="select__main slideDown" 
            v-if="type === 'list'"
            :class="[show ? 'select__main--active' : '']"
        >
                <OptionsList 
                    @select="(option)=>{selectOption(option)}" 
                    :options="options"
                    :selected="selected"
                    :width="width"
                />
        </div>
        <div 
            class="select__main select__main--range" 
            v-if="type === 'range'"
            :class="[show ? 'select__main--active' : '']"
        >
            <Range 
                @select="(range)=>{$emit('select', range)}"
                :defaultMin="minVal"
                :defaultMax="maxVal"
                :min="min"
                :max="max"
                :unit="unit"
            />
        </div>
    </div>
</template>

<script>
import OptionsList from './components/OptionsList'
import Range from '@/components/Range'

export default {
    components:{
        OptionsList,
        Range
    },
    props:{
        type: {
            type: String,
            default: 'list'
        },
        burgerMenu: Boolean,

        defaultText: String,
        options: Array,
        selectDefault: String,
        width: Number,

        max: Number,
        min: Number,
        minVal: Number,
        maxVal: Number,
        unit: String,
    },
    data(){
        return{
            show: false,
            selectedOption: '',

            isSmallScreen: window.screen.width <= 900
        }
    },
    computed:{
        selected: function(){
            if(this.selectDefault){
                return this.selectDefault
            }
            return this.selectedOption ? this.selectedOption : this.defaultText ? this.defaultText : this.options[0]
        }
    },
    methods:{
        showOptions(){
            this.show = true
        },
        hiddeOptions(){
            this.show = false
        },
        selectOption(option){
            this.selectedOption = option
            this.hiddeOptions()
            this.$emit('select', option)
        },
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/colors.scss';

.select{
    position: relative;
    cursor: pointer;

    display: inline-block;

    &__default{
        display: flex;
        justify-content: space-between;
        align-items: center;

        padding-bottom: 8px;

        font-weight: normal;
        line-height: 104%;
    }

    &__main{
        display: inline;

        position: absolute;
        top: 100%;
        right: 0;

        margin: auto;

        z-index: 3;
        
        opacity: 0;
        transform: scaleY(0);
        transform-origin: 100% 0%;
        transition: all .2s;

        &--range{
            right: -105px;
        }

        &--active{
            opacity: 1;
            transform: scaleY(1);
        }
    }

    &__burger{
        cursor: pointer;
        display: inline;

        background-color: white;

        display: inline;

        &:hover>div{
            background-color: $red;
        }
        div{    
            margin-top: 4px;
            background-color: $text-primary;

            width: 21px;
            height: 1px;

            &:nth-child(2){
                width: 14px;
            }
            &:nth-child(3){
                width: 8px;
            }
        }
    }
}
</style>