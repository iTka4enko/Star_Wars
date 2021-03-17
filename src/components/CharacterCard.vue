<template>
    <div 
        class="character"
        :style="characterStyles"
    >
        <div>{{character.birth_year}}</div>
        <h2>{{character.name}}</h2>
        <ul>
            <li><span>Eye color : </span>{{character.eye_color}}</li>
            <li><span>Height : </span>{{character.height}}</li>
            <li><span>Mass : </span>{{character.mass}}</li>
        </ul>
    </div>
</template>

<script>
export default {
    props:{
        character: Object
    },
    data(){
        return{
            isSmallScreen: window.screen.width <= 520
        }
    },
    methods:{
        getImgUrl(name) {
            return require('@/assets/images/characters/' + name + '.jpg').replace(/\s/g, '%20');
        }
    },
    computed:{
        characterStyles: function(){
            if(this.isSmallScreen){
                return `
                    background: center / cover no-repeat linear-gradient(rgba(0, 0, 0, 0.1),rgba(0, 0, 0, 0.7)), 
                    center / cover no-repeat url(${this.getImgUrl(this.character.name)});
                ` 
            }else{
                return `
                    background: center / cover no-repeat linear-gradient(rgba(0, 0, 0, 0.56), rgba(0, 0, 0, 0.08)), 
                    center / cover no-repeat url(${this.getImgUrl(this.character.name)});
                ` 
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.character{
    border-radius: 6px;

    padding: 21px 24px;

    width: 608px;
    height: 410px;

    color: white;

    overflow: hidden;

    position: relative;

    &>div{
        font-weight: 100;
        line-height: 104%;
    }
    h2{
        margin-top: 16px;
        font-weight: 400;
        font-size: 24px;
        line-height: 148%;
    }
    ul{
        margin-top: 12px;

        display: flex;

        li{
            line-height: 180%;
            margin-left: 24px;
            font-weight: 100;

            &:first-child{
                margin-left: 0;
            }
        }
    }
}

@media (max-width: 1432px) {
    .character{
        width: 100%;
    }
}
@media(max-width: 520px){
    .character{
        flex-flow: column;
        width: 100%;

        ul{
            li{
                margin-left: 16px;
            }
        }
    }
}
</style>