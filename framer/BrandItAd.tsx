// BrandIt ad as a Framer code component.
// In Framer: Assets → Code → New code file → paste this file. The component loads the same library the studio uses.
// Paste "Copy settings" from the studio into Settings to reproduce an ad exactly; the other controls override it.
import { addPropertyControls, ControlType } from "framer"
import { useEffect, useState } from "react"

const CDN = "https://cdn.jsdelivr.net/gh/denysovski/BrandIt@main/"

type Lib = typeof import("../lib/brandit.js")
let libPromise: Promise<Lib> | null = null
const loadLib = () => (libPromise ||= import(/* @vite-ignore */ CDN + "lib/brandit.js") as Promise<Lib>)

const TEMPLATES = ["stat-poster", "year-mark", "wordmark-photo", "statement", "hiring", "new-work", "quote", "event", "services", "book-call", "big-number", "team-strip", "court-partner", "court-contest", "court-coach", "court-match", "court-result", "court-academy", "product", "sale", "launch", "tips", "announce", "carousel-cover"]
const THEMES = ["mono", "ink", "signal", "paper", "court", "volt"]

/**
 * @framerSupportedLayoutWidth fixed
 * @framerSupportedLayoutHeight fixed
 * @framerIntrinsicWidth 540
 * @framerIntrinsicHeight 675
 */
export default function BrandItAd(props) {
    const [lib, setLib] = useState<Lib | null>(null)
    useEffect(() => { loadLib().then(setLib) }, [])
    if (!lib) return <div style={{ ...props.style, width: "100%", height: "100%", background: "#f4f3f1" }} />

    let saved: any = {}
    try { saved = props.settings ? JSON.parse(props.settings) : {} } catch { saved = {} }
    const id = props.template || saved.template || "stat-poster"
    const tpl = lib.getTemplate(id)
    // Text 1…6 fill the template's fields in order (see framer/README.md for the order of each template)
    const keys = Object.keys(tpl.fields)
    const fields = { ...(saved.fields || {}) }
    ;[props.text1, props.text2, props.text3, props.text4, props.text5, props.text6].forEach((v, i) => {
        if (v && keys[i]) fields[keys[i]] = v.replace(/\\n/g, "\n")
    })
    const brand = { ...(saved.brand || {}), ...(props.brandName ? { name: props.brandName } : {}), ...(props.brandShort ? { short: props.brandShort } : {}) }
    const theme = props.theme === "auto" ? saved.theme || "mono" : props.theme
    const markup = lib.render(id, { theme, fields, brand, image: props.image?.src })
    return (
        <div style={{ ...props.style, width: "100%", height: "100%", overflow: "hidden" }}>
            <style>{lib.css(CDN + "fonts/")}</style>
            <div style={{ width: "100%", height: "100%" }} dangerouslySetInnerHTML={{ __html: markup }} />
        </div>
    )
}

addPropertyControls(BrandItAd, {
    template: { type: ControlType.Enum, title: "Template", options: ["", ...TEMPLATES], optionTitles: ["From settings", ...TEMPLATES], defaultValue: "stat-poster" },
    theme: { type: ControlType.Enum, title: "Theme", options: ["auto", ...THEMES], optionTitles: ["From settings", ...THEMES], defaultValue: "signal" },
    text1: { type: ControlType.String, title: "Text 1", displayTextArea: true },
    text2: { type: ControlType.String, title: "Text 2", displayTextArea: true },
    text3: { type: ControlType.String, title: "Text 3", displayTextArea: true },
    text4: { type: ControlType.String, title: "Text 4", displayTextArea: true },
    text5: { type: ControlType.String, title: "Text 5", displayTextArea: true },
    text6: { type: ControlType.String, title: "Text 6", displayTextArea: true },
    image: { type: ControlType.ResponsiveImage, title: "Photo" },
    brandName: { type: ControlType.String, title: "Brand name" },
    brandShort: { type: ControlType.String, title: "Short mark" },
    settings: { type: ControlType.String, title: "Settings", displayTextArea: true, placeholder: "Paste “Copy settings” from the studio" },
})
