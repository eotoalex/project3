import React from 'react';
import './NewsReview.css'
import API from '../../utils/API';

class NewsReview extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            articleHeadline:"Headline",
            articleImage:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbwyQzHtakx1IHsn6y-Ln1KDJ05elxbr0eQlrb1-PCIWqlo_MGrg&s",
        }
        this.loadHeadline = this.loadHeadline.bind(this)
        this.loadArticleImg = this.loadArticleImg.bind(this)
    }

    async componentDidMount() {
        await this.loadHeadline(this.state.articleHeadline)
        await this.loadArticleImg(this.state.articleImg)
    }

    loadHeadline=()=>{
        // Headline and the Image will be loaded here from the api scraper
        API.getNewsArticleSpecs()
        .then((res)=>{
            console.log(res);
            // this.setState({
            //     articleHeadline:res
            // })
        })
    }
    loadArticleImg = (x) => {
        return x
    }
    
    render(){
        return(
            <div>
               <div>
                <p>{this.state.articleHeadline}</p>
               
                <img className="article_img" src={this.state.articleImage}/>
                </div>
              


                <p>url</p>
                <div>
                    <p>Comment Area</p>
                </div>
                <div>
                    <p>Previous Comments</p>
                </div>
            </div>
        )
    }
}
export default NewsReview;
