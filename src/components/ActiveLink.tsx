import { cloneElement, ReactElement } from "react";
import Link, {LinkProps} from "next/link";
import { useRouter } from "next/router";

// Deixar o link com a cor ativa

interface ActiveLinkProps extends LinkProps {
  shouldMatchExactHref?: boolean;
  children: ReactElement;
}

export function ActiveLink({
  shouldMatchExactHref = false,
  children,
  ...rest } :
  ActiveLinkProps) {

  const { asPath } = useRouter();

  let isActive = false;

  if (shouldMatchExactHref && (asPath === rest.href || asPath === rest.as)) {
    isActive = true;
  }

  if (!shouldMatchExactHref &&
    (asPath.startsWith(String(rest.href)) ||
     asPath.startsWith(String(rest.as)))) {
    isActive = true;
  }

  return (
    <Link {...rest}>
      {cloneElement(children, {
        color: isActive ? 'pink.400' : 'gray.50',
      })}
    </Link>
  );
}
