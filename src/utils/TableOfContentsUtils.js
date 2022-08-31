/**
 * Returns the h2 and h3 heading elements from the DOM, nested in parent/child relationship.
 */
export function getNestedHeadings(headingElements) {
    const nestedHeadings = [];

    headingElements.forEach((heading, index) => {
        const { innerText: title, id } = heading;

        if (heading.nodeName === "H2") {
            nestedHeadings.push({ id, title, items: [] });
        // Removed h3 support, can be re-enabled if needed
        //} else if (heading.nodeName === "H3" && nestedHeadings.length > 0) {
        //    nestedHeadings[nestedHeadings.length - 1].items.push({
        //        id,
        //        title,
        //    });
        }
    });

    return nestedHeadings;
}

/**
 * Represents the Headings objects, supporting a single level of nesting, and linking to 
 * the corresponding locations in the document.
 */
export const Headings = ({ headings, activeHeadingId }) => (
    <ul id='headings-list'>
      {headings.map((heading) => (
        <li key={heading.id} className={heading.id === activeHeadingId ? "active" : ""}>
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
                <li key={child.id} className={child.id === activeHeadingId ? "active" : ""}>
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