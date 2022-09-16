import React, { useState, useRef, useEffect} from "react";
import styled from "styled-components";
import tw from "twin.macro";
import {
    SectionHeading,
    Subheading as SubheadingBase,
} from "components/misc/Headings.js";
import { SectionDescription } from "components/misc/Typography.js";
import { Container, ContentWithPaddingXl } from "components/misc/Layouts.js";
import BlogService from "../../Services/BlogService";
import { ReactComponent as SignUpIcon } from "feather-icons/dist/icons/log-in.svg";
import { ReactComponent as SvgDecoratorBlob1 } from "images/svg-decorator-blob-7.svg";
import { ReactComponent as SvgDecoratorBlob2 } from "images/svg-decorator-blob-8.svg";

const Subheading = tw(SubheadingBase)`mb-4 text-center`;
const Heading = tw(SectionHeading)`w-full`;
const Description = tw(SectionDescription)`items-center w-full text-center`;
const Column = tw.div`flex flex-col items-center`;
const HeaderContent = tw.div``;
const Form = tw.form`mx-auto max-w-3xl`;
const Input = tw.input`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-600 placeholder-gray-600 text-sm focus:outline-none focus:border-gray-500 focus:bg-white mt-5 focus:placeholder-gray-500 first:mt-0`;
const SubmitButton = styled.button`
  ${tw`mt-5 px-5 tracking-wide font-semibold bg-primary-600 text-gray-100 w-2/6 py-3 rounded-lg hover:bg-primary-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
`;

const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none -z-20 absolute right-0 top-0 h-56 w-56 opacity-15 transform translate-x-2/3 -translate-y-12 text-teal-400`}
`;
const DecoratorBlob2 = styled(SvgDecoratorBlob2)`
  ${tw`pointer-events-none -z-20 absolute left-0 bottom-0 h-64 w-64 opacity-15 transform -translate-x-2/3 text-primary-500`}
`;

const AddBlogs = ({
    user={},
}) => {
    let currentDate = new Date();
    let date=currentDate.getDate()+ "/" +(currentDate.getMonth() + 1) + "/" + currentDate.getFullYear();
    let time = currentDate.getHours() + ":" + currentDate.getMinutes();
    const [blog, setBlog] = useState({
        title:"",
        tag: "",
        img:"",
        date: date,
        time: time,
        description: "",
        email:user.email,
        name:user.name,
        picture:user.picture,
        upvote:0,
        downvote:0,
           
    });
    const [message, setMessage] = useState(null);
    let timerID = useRef(null);

    useEffect(() => {
        return () => {
            clearTimeout(timerID);
        };
    }, []);

    const onChange = (e) => {
        setBlog({ ...blog, [e.target.name]: e.target.value });
       
    };

    const resetForm = () => {
        setBlog({
            title:"",
            tag: "",
            img: "",
            date: "",
            time: "",
            description: "",
            email:"",
            name:"",
            picture:"",
            upvote:0,
            downvote:0,
        });
    };
    const onSubmit = (e) => {
        e.preventDefault();
        var blog1=blog;
        blog1.email=user.email;
        console.log("adding1",blog1)
        BlogService.postBlog(blog1).then((data) => {
            const { message } = data;
            setMessage(message);
            resetForm();
            if (!message.msgError) {
                timerID = setTimeout(() => {
                }, 2000);
            }
        });
    };
    return (
        <Container tw="m-8">
            <ContentWithPaddingXl>
                <Column>
                    <HeaderContent>
                        <Subheading>Talkn</Subheading>
                        <Heading>Add Blog</Heading>
                        <p align="center">
                            <Description>
                                Add title, category and description of your blog</Description> 
                        </p>
                    </HeaderContent>
                    <br />
                    <br />
                    <br />
                    <Form onSubmit={onSubmit}>
                    <Input
                            type="text"
                            name="title"
                            value={blog.title}
                            onChange={onChange}
                            placeholder="Title of Blog"
                        />
                        <Input
                            type="text"
                            name="tag"
                            value={blog.tag}
                            onChange={onChange}
                            placeholder="Tag realted to Blog"
                        />
                        <Input
                            type="url"
                            name="img"
                            value={blog.img}
                            onChange={onChange}
                            placeholder="Image Link"
                        />
                        <Input
                            type="text"
                            name="description"
                            value={blog.description}
                            onChange={onChange}
                            placeholder="Description of your blog"
                        />
            
                        <p align="right">
                            <SubmitButton type="submit">
                                <SignUpIcon className="icon" />
                                <span className="text">Add</span>
                            </SubmitButton>
                        </p>
                    </Form>

                </Column>
            </ContentWithPaddingXl>
            <DecoratorBlob1 />
            <DecoratorBlob2 />
        </Container>
        // </AnimationRevealPage>
    );
};

export default AddBlogs;
