<template>
    <nav>
        <div class="container">
            <div class="header">
                <div class="logo header__logo">
                    <a href="/"></a>
                    <img src="@/assets/images/star_wars.svg" alt="">
                </div>
                <ul class="header__buttons">
                    <li 
                        v-if="!isSmallScreen" 
                        class="header__logInLangs"
                    >
                        <div class="header__elem">
                            <Select 
                                :options="langs"
                                :width="40"
                            />
                        </div>
                        <div class="header__elem">
                            <a href="">Log in</a>
                        </div>   
                    </li> 
                    <li v-if="isSmallScreen">
                        <div  
                            @click="showSideBar"
                            class="header__burger"
                        >
                            <div></div>
                            <div></div>
                        </div>
                        <div 
                            class="header__aside"
                            :class="{hidden: !showAside}"
                        >
                            <SideBar 
                                @close="hiddeSideBar"
                                :width="sideBarWidth"
                            >
                                <ul class="aside__content">
                                    <li>
                                        <Select :options="langs"/>
                                    </li>
                                    <li>
                                        <a href="">Log in</a>
                                    </li>  
                                </ul>
                            </SideBar>
                        </div>
                    </li>
                    <li class="header__elem">
                        <a class="header__signUp main-button main-button--large" href="">Sign up</a>
                    </li>  
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
import Select from '@/components/Select/Select'
import SideBar from '@/components/SideBar'

export default {
    components:{
        Select,
        SideBar
    },
    data(){
        return{
            langs: [
                'En',
                'Ua',
                'Ru'
            ],
            showAside: false,
            sideBarWidth: 220,

            isSmallScreen: window.screen.width <= 900,
        }
    },
    methods:{
        showSideBar(){
            this.showAside = true
        },
        hiddeSideBar(){
            this.showAside = false
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/colors.scss';

nav{
    background-color: $primary;
}
.header{
    display: flex;
    justify-content: space-between;
    align-items: center;

    height: 80px;

    &__buttons{
        display: flex;
    }
    &__logInLangs{
        display: flex;
    }
    &__elem{
        margin: 0 43px;

        &:last-child{
            margin-right: 0;
        }
    }

    &__aside{
        position: fixed;
        right: 0;
        top: 0;

        z-index: 5;

        transition: all .4s;
    }

    &__burger{
        cursor: pointer;
        transform: translateY(-3px);

        &:hover>div{
            background-color: $red;
        }
        div{    
            margin-top: 7.4px;
            background-color: $text-primary;

            width: 24px;
            height: 1px;
        }
    }
}

.aside__content{
    height: 100%;

    li{
        margin-top: 15px;

        &:first-child{
            margin-top: 0;
        }
    }
}
.hidden{
    right: -220px;
}

@media (max-width: 900px) {
    nav{
        background-color: #fff;
    }
    .header{
        &__signUp{
            background-color: transparent;
            color: $text-primary;

            padding-left: 8px;
            padding-right: 8px;

            &:hover{
                background-color: transparent;
                color: $text-primary;
            }
        }
        &__elem{
            &:last-child{
                order: -1;
                margin-right: 43px;
            }
        }
    }
}
</style>
