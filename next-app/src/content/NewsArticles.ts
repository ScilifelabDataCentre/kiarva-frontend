type Article = Readonly<{
    imageName: string,
    date: string,
    showDay: boolean,
    textBody: string[],
}>

/* 
A list of article objects. How to use it:

Quick example:

For an image called newsImage.jpg already added to the repository, desired article publish date 
2026-03-04 with the text

    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
    Praesent gravida, ipsum ac faucibus ultricies, tellus odio.

    Malesuada elit, vel tincidunt massa dui eu sem. Aenean 
    luctus ipsum in enim pretium tempus. Proin a est neque. 
    Donec lorem massa, lobortis a orci vitae, consequat vestibulum.

Add the following article:

{
    imageName: "newsImage.jpeg",
    date:"2026-03-04",
    showDay: true,
    textBody: [
        `
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. \
            Praesent gravida, ipsum ac faucibus ultricies, tellus odio.\
        `,
        `
            Malesuada elit, vel tincidunt massa dui eu sem. Aenean \
            luctus ipsum in enim pretium tempus. Proin a est neque. \
            Donec lorem massa, lobortis a orci vitae, consequat vestibulum.\
        `
    ]
},

For a longer explanation on how it works, see bottom of the page.
*/


export const Articles: Article[] = [
    {
        imageName: "KIARVANewsThumbnail2.jpeg",
        date:"2026-03-01",
        showDay: false,
        textBody: [
            `
                We are happy to release the first public version of our new \
                research tool, KIARVA, described in detail in Corcoran et al. \
                Immunity 2026. Please visit our introduction and instruction \
                videos and note that you can find Frequently Asked Questions \
                (FAQs) under “Additional information” in the top menu.
            `
        ],
    },
    // {
    //     imageName: "CorcoranEtAlImmunity2026.jpg",
    //     date:"2026-03-04",
    //     showDay: true,
    //     textBody: [
    //         `
    //             Lorem ipsum dolor sit amet, consectetur adipiscing elit. \
    //             Praesent gravida, ipsum ac faucibus ultricies, tellus odio \
    //             malesuada elit, vel tincidunt massa dui eu sem. Aenean \
    //             luctus ipsum in enim pretium tempus. Proin a est neque. \
    //             Donec lorem massa, lobortis a orci vitae, consequat vestibulum \
    //             velit. Quisque tempor elit vel urna suscipit, vel laoreet neque \
    //             venenatis. Sed leo quam, fringilla non accumsan sed, mollis \
    //             ultricies libero. Ut posuere sit amet eros a mollis. Sed \
    //             viverra interdum est et finibus. Mauris sit amet tellus \
    //             non nisi sodales laoreet. Duis consequat ante a sagittis aliquam.
    //         `
    //     ],
    // },
    // {
    //     imageName: "GAFischerCorcoranImmunity2026.jpg",
    //     date:"2026-03-04",
    //     showDay: false,
    //     textBody: [
    //         `
    //             In Fischer, Corcoran, et al., we investigated how inherited variation \
    //             in antibody genes influences antibody responses to influenza HA to \
    //             highlight population vulnerabilities that could be mitigated in the \
    //             design of globally protective vaccines.
    //         `
    //     ],
    // },
]

/*
How it works:

You have an image, a date and a text that you want to put together into an article.

imageName: 

Let's say the image is called "newsImage.jpg" (try to avoid special 
characters in the name, they may cause problems for some browsers). Add the image to
/kiarva-frontend/next-app/public/images/newsImage.jpg. After this you can put the new article
imageName: "newsImage.jpg".

date:

Write the desired date in the format "YYYY-MM-DD". For some articles we only want to display year
and month. To show the full date put showDay: true, to only show year and month put showDay: false.

textBody:

This is where the body of the text is. Two important things to note here:

1. textBody is a list of several pieces of text. We cannot put styling into a string (HTML will ignore newlines from strings)
so separating them into lists lets us easily control breakpoints, if needed.

2. Putting the text on multiple lines here does not affect the text formating on the website, but it makes
it easier to read while working. Regular (" ") quotation marks do not support multiline strings, so we need to use
another type of quotation marks that looks like this ` `. To avoid adding undesired \newline characters, you may
add \ to the end of each line. However, even if you keep the \newline characters in it should not affect how it looks
on the website.

So if we wanted a text that would look like this on the website:

    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
    Praesent gravida, ipsum ac faucibus ultricies, tellus odio.

    Malesuada elit, vel tincidunt massa dui eu sem. Aenean 
    luctus ipsum in enim pretium tempus. Proin a est neque. 
    Donec lorem massa, lobortis a orci vitae, consequat vestibulum.

We would add it to textBody like this:

textBody: [
    `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. \
        Praesent gravida, ipsum ac faucibus ultricies, tellus odio.\
    `,
    `
        Malesuada elit, vel tincidunt massa dui eu sem. Aenean \
        luctus ipsum in enim pretium tempus. Proin a est neque. \
        Donec lorem massa, lobortis a orci vitae, consequat vestibulum.\
    `
]
*/