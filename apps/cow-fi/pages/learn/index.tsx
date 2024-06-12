import { GetStaticProps } from 'next'
import { Font, Color, Media } from '@cowprotocol/ui'

import styled from 'styled-components'

import { CONFIG } from '@/const/meta'

import Layout from '@/components/Layout'
import { getCategories, getArticles, ArticleListResponse } from 'services/cms'

import { SearchBar } from '@/components/SearchBar'
import { ArrowButton } from '@/components/ArrowButton'

import {
  ContainerCard,
  ContainerCardSection,
  ContainerCardSectionTop,
  ArticleList,
  ArticleCard,
  ArticleImage,
  ArticleTitle,
  ArticleDescription,
  TopicList,
  TopicCard,
  TopicImage,
  LinkSection,
  LinkColumn,
  LinkItem,
  CTASectionWrapper,
  CTAImage,
  CTASubtitle,
  CTATitle,
  CTAButton,
  ContainerCardSectionTopTitle,
  TopicTitle,
} from '@/styles/styled'

const DATA_CACHE_TIME_SECONDS = 5 * 60 // Cache 5min

const PODCASTS = [
  { title: 'CoW Hooks: you are in control!', link: '/podcast/cow-hooks' },
  { title: 'CoW Swap for DAOs', link: '/podcast/cow-swap-for-daos' },
  { title: 'Introducing surplus-capturing limit orders', link: '/podcast/surplus-limit-orders' },
  { title: 'Tally Recipes for CoW Swaps', link: '/podcast/tally-recipes' },
]

const SPACES = [
  { title: 'CoW Swap Introduces “I’m Feeling Lucky” Mode for DeFi Trades', link: '/space/feeling-lucky' },
  { title: 'CoW Protocol February 2024 Highlights', link: '/space/feb-2024-highlights' },
  { title: 'How to Add Custom Tokens on CoW Swap', link: '/space/custom-tokens' },
  { title: 'What is Loss-Versus-Rebalancing (LVR)?', link: '/space/lvr' },
]

const MEDIA_COVERAGE = [
  {
    title: 'Bots fleece DeFi liquidity providers for $500m every year. CoW DAO’s new exchange stops them ',
    publisher: 'DLNews',
    image: '/images/media-coverage/DLNews-bots-fleece.webp',
    link: 'https://www.dlnews.com/articles/defi/new-cow-swap-amm-will-stop-mev-bots-and-save-users-millions/',
    linkExternal: true,
  },
  {
    title: 'Ethereum projects unite to protect users from MEV-induced high prices',
    publisher: 'The Crypto Times',
    image: '/images/media-coverage/Ethereum-Foundation-Raises-Funds-Website.webp',
    link: 'https://www.cryptotimes.io/2024/01/22/ethereum-foundation-sells-700-eth-via-cow-protocol/',
    linkExternal: true,
  },
  {
    title: 'CoW Swap: A Beginner’s Guide to This New Decentralized Exchange',
    publisher: 'BeInCrypto',
    image: '/images/media-coverage/learn_CoW_Swap-covers_logo.webp',
    link: 'https://beincrypto.com/learn/cow-swap-guide/',
    linkExternal: true,
  },
  {
    title: 'CoW Swap: Intents, MEV, and Batch Auctions',
    publisher: 'Shoal Research',
    image: '/images/media-coverage/shoal-research-intents.webp',
    link: 'https://www.shoal.gg/p/cow-swap-intents-mev-and-batch-auctions',
    linkExternal: true,
  },
]

interface PageProps {
  siteConfigData: typeof CONFIG
  categories: {
    name: string
    slug: string
    description: string
    bgColor: string
    textColor: string
    link: string
    iconColor: string
    imageUrl: string // Add this line to include the imageUrl property
  }[]
  articles: ArticleListResponse['data']
  featuredArticles: {
    title: string
    description: string
    link: string
    cover: string
  }[]
}

const Wrapper = styled.div`
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  max-width: 1600px;
  width: 100%;
  margin: 76px auto 0;
  gap: 24px;

  h1 {
    font-size: 28px;
    font-weight: ${Font.weight.medium};
    color: ${Color.neutral50};
    text-align: center;

    ${Media.upToMedium()} {
      font-size: 18px;
    }
  }

  h2 {
    font-size: 67px;
    text-align: center;

    ${Media.upToMedium()} {
      font-size: 38px;
    }
  }
`

export default function Page({ siteConfigData, categories, articles, featuredArticles }: PageProps) {
  const { title } = siteConfigData

  return (
    <Layout metaTitle={`Knowledge Base - ${title}`}>
      <Wrapper>
        <h1>Learn - Knowledge Base</h1>
        <h2>Hi, how can we help?</h2>

        <SearchBar articles={articles} />

        <ContainerCard>
          <ContainerCardSection>
            <ContainerCardSectionTop>
              <ContainerCardSectionTopTitle>Featured articles</ContainerCardSectionTopTitle>
              <ArrowButton link="/learn/articles" text="All articles" />
            </ContainerCardSectionTop>
            <ArticleList>
              {featuredArticles.map(({ title, description, cover, link }, index) => (
                <ArticleCard key={index} href={link}>
                  <ArticleImage color="#000">{cover && <img src={cover} alt={title} />}</ArticleImage>
                  <ArticleTitle>{title}</ArticleTitle>
                  <ArticleDescription>{description}</ArticleDescription>
                </ArticleCard>
              ))}
            </ArticleList>
          </ContainerCardSection>

          <ContainerCardSection>
            <ContainerCardSectionTop>
              <ContainerCardSectionTopTitle>Topics</ContainerCardSectionTopTitle>
            </ContainerCardSectionTop>
            <TopicList columns={3}>
              {categories.map(({ name, bgColor, textColor, iconColor, link, imageUrl }, index) => {
                return (
                  <TopicCard key={index} bgColor={bgColor} textColor={textColor} href={link}>
                    <TopicImage iconColor={iconColor} bgColor={bgColor}>
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={name}
                          onError={(e) => {
                            e.currentTarget.onerror = null
                            e.currentTarget.style.display = 'none' // Hide image if it fails to load
                          }}
                        />
                      ) : (
                        <span>{name.charAt(0)}</span>
                      )}
                    </TopicImage>
                    <TopicTitle>{name}</TopicTitle>
                  </TopicCard>
                )
              })}
            </TopicList>
          </ContainerCardSection>

          <ContainerCardSection>
            <ContainerCardSectionTop>
              <ContainerCardSectionTopTitle>Podcasts & Spaces</ContainerCardSectionTopTitle>
            </ContainerCardSectionTop>
            <LinkSection>
              <LinkColumn>
                <h5>Podcasts</h5>
                {PODCASTS.map((podcast, index) => (
                  <LinkItem key={index} href={podcast.link}>
                    {podcast.title}
                    <span>→</span>
                  </LinkItem>
                ))}
              </LinkColumn>

              <LinkColumn>
                <h5>Spaces</h5>
                {SPACES.map((space, index) => (
                  <LinkItem key={index} href={space.link}>
                    {space.title}
                    <span>→</span>
                  </LinkItem>
                ))}
              </LinkColumn>
            </LinkSection>
          </ContainerCardSection>

          <ContainerCardSection>
            <ContainerCardSectionTop>
              <ContainerCardSectionTopTitle>Media coverage</ContainerCardSectionTopTitle>
            </ContainerCardSectionTop>
            <ArticleList columns={4}>
              {MEDIA_COVERAGE.map(({ image, title, publisher, link, linkExternal }, index) => (
                <ArticleCard
                  key={index}
                  href={link}
                  target={linkExternal ? '_blank' : '_self'}
                  rel={linkExternal ? 'noopener' : ''}
                >
                  <ArticleImage>{image && <img src={image} alt={title} />}</ArticleImage>
                  <ArticleTitle>{title}</ArticleTitle>
                  <ArticleDescription>Published by {publisher}</ArticleDescription>
                </ArticleCard>
              ))}
            </ArticleList>
          </ContainerCardSection>
        </ContainerCard>

        <ContainerCard bgColor={Color.neutral98} touchFooter>
          <CTASectionWrapper>
            <CTAImage bgColor={'#00A1FF'}></CTAImage>
            <CTASubtitle>Explore, learn, integrate</CTASubtitle>
            <CTATitle>CoW DAO documentation</CTATitle>
            <CTAButton href="https://docs.cow.fi/" target="_blank" rel="noopener noreferrer">
              Read the docs
            </CTAButton>
          </CTASectionWrapper>
        </ContainerCard>
      </Wrapper>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const siteConfigData = CONFIG
  const categoriesResponse = await getCategories()
  const articlesResponse = await getArticles()

  const featuredArticlesResponse = await getArticles({
    filters: { featured: { $eq: true } },
    pageSize: 6,
  })

  const categories =
    categoriesResponse?.map((category: any) => {
      const imageUrl = category?.attributes?.image?.data?.attributes?.url || ''

      return {
        name: category?.attributes?.name || '',
        slug: category?.attributes?.slug || '',
        description: category?.attributes?.description || '',
        bgColor: category?.attributes?.backgroundColor || '#fff',
        textColor: category?.attributes?.textColor || '#000',
        link: `/learn/topic/${category?.attributes?.slug}`,
        iconColor: '#fff',
        imageUrl, // Ensure this field is correctly populated
      }
    }) || []

  const featuredArticles = featuredArticlesResponse.data.map((article) => {
    const attributes = article.attributes
    return {
      title: attributes?.title || 'No title',
      description: attributes?.description || 'No description',
      link: `/learn/${attributes?.slug || 'no-slug'}`,
      cover: attributes?.cover?.data?.attributes?.url || '',
    }
  })

  return {
    props: {
      siteConfigData,
      categories,
      articles: articlesResponse.data,
      featuredArticles,
    },
    revalidate: DATA_CACHE_TIME_SECONDS,
  }
}
