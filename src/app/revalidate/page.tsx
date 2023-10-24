import { revalidatePath } from "next/cache"
import { RedirectType, redirect } from "next/navigation";

export default function RevalidatePage() {
    revalidatePath('/');
    redirect('/', RedirectType.replace);
}
