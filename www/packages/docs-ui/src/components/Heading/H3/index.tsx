"use client"

import clsx from "clsx"
import React from "react"
import { CopyButton, Link } from "@/components"
import { useHeadingUrl, useLayout } from "../../.."

export type H3Props = React.HTMLAttributes<HTMLHeadingElement> & {
  id?: string
}

export const H3 = ({ className, children, ...props }: H3Props) => {
  const { showCollapsedNavbar } = useLayout()
  const copyText = useHeadingUrl({ id: props.id || "" })
  return (
    <h3
      className={clsx(
        "text-h3 [&_code]:!text-h3 [&_code]:!font-mono my-docs_1 text-medusa-fg-base",
        props.id && [
          "group/h3",
          showCollapsedNavbar && "scroll-m-docs_7",
          !showCollapsedNavbar && "scroll-m-56",
        ],
        className
      )}
      {...props}
    >
      {children}
      {props.id && (
        <CopyButton
          text={copyText}
          className="opacity-0 group-hover/h3:opacity-100 transition-opacity ml-docs_0.5 inline-block"
        >
          <Link href={`#${props.id}`} scroll={false}>
            #
          </Link>
        </CopyButton>
      )}
    </h3>
  )
}
