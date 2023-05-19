<script lang="ts">
    import "./article.css";
</script>

<div id="article-wrapper">
    <article class="prose lg:prose-lg">
        <slot/>
        <section>
            backlinks
        </section>
    </article>
    <aside>
        <section>
            <span class="font-bold text-gray-500">On This Page</span>
            <ul>
                <li><a href="#">What are we doing?</a></li>
                <li><a href="#">What are we doing?</a></li>
                <li><a href="#">What are we doing?</a></li>
            </ul>
        </section>
        <section>
            <span class="font-bold text-gray-500">Graph View</span>
        </section>
    </aside>
</div>

<style>
    #article-wrapper {
        display: flex;
    }
    article {
        flex-grow: 1;
        max-width: 75ch;
        padding-inline: 3rem;
        padding-block: 2.5rem;

        word-break: break-word;
    }
    aside {
        position: sticky;
        top: 2.5rem;
        height: min-content;

        display: flex;
        flex-direction: column;
        gap: 3rem;

        padding-inline: 3rem;
    }
</style>


