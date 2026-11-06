/* Seeded, recursive longest-edge subdivision. No pre-rendered transition assets. */
(function(root) {
  'use strict';
  const area = p => Math.abs((p[1].x-p[0].x)*(p[2].y-p[0].y)-(p[2].x-p[0].x)*(p[1].y-p[0].y))/2;
  const center = p => ({x:(p[0].x+p[1].x+p[2].x)/3,y:(p[0].y+p[1].y+p[2].y)/3});
  function random(seed) {
    return () => { let t=seed+=0x6D2B79F5; t=Math.imul(t^t>>>15,t|1); t^=t+Math.imul(t^t>>>7,t|61); return ((t^t>>>14)>>>0)/4294967296; };
  }
  function create(width, height, seed, count, origin={x:width/2,y:height/2}) {
    const rand=random(seed), a={x:0,y:0}, b={x:width,y:0}, c={x:width,y:height}, d={x:0,y:height};
    let leaves=(rand()>.5?[[a,b,c],[a,c,d]]:[[a,b,d],[b,c,d]]).map((points,i)=>({points,depth:0,path:String(i),parent:center(points)}));
    while(leaves.length<count) {
      let selected=0, score=-1;
      leaves.forEach((leaf,i)=>{const value=area(leaf.points)*(1+rand()*.3);if(value>score){score=value;selected=i;}});
      const leaf=leaves[selected], p=leaf.points;
      let edge=0,longest=-1;
      for(let i=0;i<3;i++){const q=p[(i+1)%3],dist=(q.x-p[i].x)**2+(q.y-p[i].y)**2;if(dist>longest){longest=dist;edge=i;}}
      const from=p[edge],to=p[(edge+1)%3],opposite=p[(edge+2)%3],ratio=.36+rand()*.28;
      const middle={x:from.x+(to.x-from.x)*ratio,y:from.y+(to.y-from.y)*ratio};
      const parent=center(p);
      leaves.splice(selected,1,...[[from,middle,opposite],[middle,to,opposite]].map((points,i)=>({points,depth:leaf.depth+1,path:leaf.path+i,parent})));
    }
    const phase=rand()*Math.PI*2, spread=Math.min(width,height);
    return leaves.map((leaf,i)=>{
      const centroid=center(leaf.points),xs=leaf.points.map(p=>p.x),ys=leaf.points.map(p=>p.y);
      const x=Math.min(...xs),y=Math.min(...ys),w=Math.max(...xs)-x,h=Math.max(...ys)-y;
      const angle=i*2.399963229728653+phase,radius=.28+.58*Math.sqrt((i+.5)/count);
      const cloud={x:width/2+Math.cos(angle)*width*.48*radius,y:height/2+Math.sin(angle)*height*.43*radius};
      const distance=Math.hypot(centroid.x-origin.x,centroid.y-origin.y)/Math.hypot(width,height);
      return {...leaf,centroid,box:{x,y,w,h},cloud,
        local:leaf.points.map(p=>({x:p.x-x,y:p.y-y})),
        delay:distance*120+rand()*45,
        turn:(rand()-.5)*140, tilt:(rand()-.5)*60,
        scale:.36+rand()*.28,
        branch:{x:(centroid.x-leaf.parent.x)*.65,y:(centroid.y-leaf.parent.y)*.65},
        drift:{x:Math.cos(angle+1)*spread*.07,y:Math.sin(angle+1)*spread*.07}
      };
    });
  }
  const api={create,area,random};
  if(typeof module==='object'&&module.exports) module.exports=api;
  else root.SKFractalGeometry=api;
})(typeof window==='object'?window:this);
