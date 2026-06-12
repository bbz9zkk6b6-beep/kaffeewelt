import { NextResponse } from 'next/server'
import { getProductBySlug } from '@/sanity/lib/fetch'

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product?.affiliateUrl) {
    return new NextResponse('Not found', { status: 404 })
  }

  console.log(`[affiliate-click] /r/${slug} → ${product.affiliateUrl}`)

  return NextResponse.redirect(product.affiliateUrl, { status: 302 })
}
