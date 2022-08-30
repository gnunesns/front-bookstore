<template>
   <div>
    <footer class="rodape bg-primary">
        <p>
            <b>Bookstore WDA ©</b> - <a href="https://github.com/gnunesns" target="_blank">
                Developed 🤍 by Guilherme Nunes.</a
            > 
        </p>
    </footer>
   </div>
    
</template>

<script>
export default {
    name: 'FooterComp',
    date(){
        
    }
    
};
</script>

<style>
.rodape {
    padding: 10px;
}
.rodape p {
    position: relative;
    text-align: center;
    margin-top: 10px;
    color: rgb(255, 255, 255);
}
.rodape p a {
    text-decoration: none;
    color: rgb(255, 255, 255);
}
</style>