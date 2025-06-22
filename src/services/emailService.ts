import emailjs, { EmailJSResponseStatus } from '@emailjs/browser'

const service_id = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!

const public_key = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!

const contact_us_id = process.env.NEXT_PUBLIC_CONTACT_US_KEY!

const course_form_template_id =
 process.env.NEXT_PUBLIC_COURSE_KEY!

export type EmailContactFormData = {
	firstName: string
	email: string
	message: string
}

export type EmailCourseFormData = {
	firstName: string
	lastName: string
	email: string
	message?: string
}

const getTemplateId = (typeOfTemplate: string): string => {
	switch (typeOfTemplate) {
		case 'contact_form':
			return contact_us_id
		case 'course_form':
			return course_form_template_id
		default:
			throw new Error(`Nieznany typ szablonu: ${typeOfTemplate}`)
	}
}

export const sendEmail = async (emailData: any, typeOfTemplate: string): Promise<EmailJSResponseStatus> => {
	const template_id = getTemplateId(typeOfTemplate)
	return emailjs.send(service_id, template_id, emailData, public_key)
}
