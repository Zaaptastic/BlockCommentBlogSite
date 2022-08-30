/**
 * Returns the h2 and h3 heading elements from the DOM, nested in parent/child relationship.
 */
export function getNestedHeadings(headingElements) {
    const nestedHeadings = [];

    headingElements.forEach((heading, index) => {
        const { innerText: title, id } = heading;

        if (heading.nodeName === "H2") {
            nestedHeadings.push({ id, title, items: [] });
        } else if (heading.nodeName === "H3" && nestedHeadings.length > 0) {
            nestedHeadings[nestedHeadings.length - 1].items.push({
                id,
                title,
            });
        }
    });

    return nestedHeadings;
}

/**
 * Represents the Headings objects, supporting a single level of nesting, and linking to 
 * the corresponding locations in the document.
 */
export const Headings = ({ headings }) => (
    <ul>
      {headings.map((heading) => (
        <li key={heading.id}>
          <a
            href={`#${heading.id}`}
            className='toc-heading-link'
            onClick={(e) => {
              e.preventDefault();
              document.querySelector(`#${heading.id}`).scrollIntoView({
                behavior: "smooth"
              });
            }}
          >
            {heading.title}
          </a>
          {heading.items.length > 0 && (
            <ul>
              {heading.items.map((child) => (
                <li key={child.id}>
                  <a
                    href={`#${child.id}`}
                    className='toc-heading-link'
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector(`#${child.id}`).scrollIntoView({
                        behavior: "smooth"
                      });
                    }}
                  >
                    {child.title}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );