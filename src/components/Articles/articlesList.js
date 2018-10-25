import React from 'react'
import * as styles from './articlesList.module.css'
import ArticlePreview from './articlePreview'

export default function articlesList( {articles}) {
    const previews = articles.map(article => (
        <ArticlePreview
            onReadMore={() => this.readMore(article.slug)}
            key={article.slug}
            {...article}
        />
    ));

  return (
    <div className={styles.listContainer}>
        {[...previews]}
    </div>
  )
}
