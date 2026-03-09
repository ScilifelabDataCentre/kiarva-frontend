type Article = Readonly<{
    imageName: string,
    imageAlt: string,
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
    textBody:
    [
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

(Where in textBody the two different paragraphs are separated by line breaks)

For a longer explanation on how it works, see bottom of the page.
*/


export const Articles: Article[] = [
    {
        imageName: "KIARVANewsThumbnail2.jpeg",
        imageAlt: "KIARVA news thumbnail",
        date:"2026-03-01",
        showDay: false,
        textBody:
        [
            `
                We are happy to release the first public version of our new \
                research tool, KIARVA, described in detail in Corcoran et al. \
                Immunity 2026. Please visit our introduction and instruction \
                videos and note that you can find Frequently Asked Questions \
                (FAQs) under “Additional information” in the top menu.
            `,
        ]
    },
    {
        imageName: "CorcoranEtAlImmunity2026.jpg",
        imageAlt: "Corcoran et al. Immunity 2026 visual abstract",
        date:"2026-03-04",
        showDay: true,
        textBody: 
        [
            `
                The genes of the immunoglobulin heavy chain (IGH) locus are \
                critical for the formation of antibodies. Previous studies using \
                limited numbers of individuals have indicated that IG germline \
                genes are highly variable between persons. In Corcoran et al., we \
                present a novel method for high-throughput sequencing of the \
                functional adaptive immune genes located in complex genomic \
                regions, and we utilize this technique to genotype 2486 individuals \
                from the 1KGP population set, comprising 25 sub-populations. The \
                study reveals high allelic coding variation and frequent genomic \
                structural variation, including gene deletions and duplications \
                that vary in frequency between the global population groups, indicative \
                of local adaptation in response to endemic and pandemic associated \
                pathogens encountered by these human populations. The study revealed \
                that many of these variants were present in archaic relatives of modern \
                humans, Neanderthal and Denisovans, indicating they existed in the \
                common ancestor of humans and archaic hominins, approximately 600,000 \
                before the present. 
            `,
            `
                The most surprising finding was the frequency of a structural deletion \
                resulting in the loss of 6 contiguous genes within the diversity (D) gene \
                locus that was present in all populations, but with especially high \
                frequency in individuals from East Asia populations (up to 30%) having \
                homozygous loss of these six genes. Since several of the affected D genes \
                are critical for the formation of broadly neutralizing antibodies against \
                common pathogens, including the influenza virus, the frequency of this \
                deletion suggests population level differences in antibody responses that \
                merit further investigation. 
            `,
            `
                The study resulted in the identification of over three hundred additional \
                gene variants in the global population, facilitating future identification \
                of functional differences associated with localized immune gene adaptation \
                in response to endemic pathogenic pressure. Overall, the study contributes \
                an important new methodology for analysis of complex immune genes and \
                provides a comprehensive resource for ongoing study of the human immune \
                system at an individual and population level.
            `
        ]

    },
    {
        imageName: "GAFischerCorcoranImmunity2026.jpg",
        imageAlt: "GA Fischer, Corcoran Immunity 2026 visual abstract",
        date:"2026-03-04",
        showDay: true,
        textBody:
        [
            `
                In Fischer, Corcoran, et al., we investigated how inherited variation \
                in antibody genes influences antibody responses to influenza HA to \
                highlight population vulnerabilities that could be mitigated in the \
                design of globally protective vaccines.
            `,
        ]
    },
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

This is where the body of the text is.

Note: Putting the text on multiple lines here does not affect the text formating on the website, but it makes
it easier to read while working. Regular (" ") quotation marks do not support multiline strings, so we need to use
another type of quotation marks that looks like this ` `. 

Adding \ to the end of each line tells the compiler not to automatically add \newline to the end of the line 
indicating a linebreak. As mentioned earlier linebreaks here do not get taken into account when rendering on the actual
website, but it's recommended to add them anyway for better control of string structure.

So if we wanted a text that would look like this on the website:

    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
    Praesent gravida, ipsum ac faucibus ultricies, tellus odio.

    Malesuada elit, vel tincidunt massa dui eu sem. Aenean 
    luctus ipsum in enim pretium tempus. Proin a est neque. 
    Donec lorem massa, lobortis a orci vitae, consequat vestibulum.

We would add it to textBody like this:

textBody:
    [
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